<?php

class BlogController {

    private const WP_API_BASE = 'https://brandsenvoy.com/wp-json/wp/v2';

    public static function handleRequest(string $method, array $uriParts, array $query): void {
        if ($method !== 'GET') {
            http_response_code(405);
            echo json_encode(['error' => 'Method Not Allowed']);
            return;
        }

        $sub = $uriParts[2] ?? null;  // 'categories' or 'posts'
        $sub2 = $uriParts[3] ?? null; // slug or null

        if ($sub === 'categories') {
            self::getCategories();
        } elseif ($sub === 'posts') {
            if ($sub2 === null) {
                self::getPosts($query);
            } else {
                self::getPostBySlug($sub2);
            }
        } else {
            http_response_code(404);
            echo json_encode(['error' => 'Endpoint Not Found']);
        }
    }

    private static function getCategories(): void {
        $url = self::WP_API_BASE . '/categories?per_page=50&orderby=count&order=desc&hide_empty=true';
        $res = self::fetchWp($url);

        if ($res['status'] !== 200) {
            echo json_encode([]);
            return;
        }

        $data = json_decode($res['body'], true);
        if (!is_array($data)) {
            echo json_encode([]);
            return;
        }

        $categories = array_map(function ($c) {
            return [
                'id'    => (int)$c['id'],
                'name'  => html_entity_decode($c['name'] ?? ''),
                'count' => (int)($c['count'] ?? 0),
            ];
        }, $data);

        echo json_encode($categories);
    }

    private static function getPosts(array $query): void {
        $page = isset($query['page']) ? (int)$query['page'] : 1;
        $perPage = isset($query['perPage']) ? (int)$query['perPage'] : 10;
        $category = $query['category'] ?? null;
        $search = $query['search'] ?? null;

        $url = self::WP_API_BASE . "/posts?per_page={$perPage}&page={$page}&_embed=1";
        if (!empty($search)) {
            $url .= '&search=' . urlencode($search);
        }

        if (!empty($category)) {
            $catId = self::lookupCategoryId($category);
            if ($catId !== null) {
                $url .= "&categories={$catId}";
            }
        }

        $res = self::fetchWp($url);
        if ($res['status'] !== 200) {
            echo json_encode([
                'posts'   => [],
                'total'   => 0,
                'page'    => $page,
                'perPage' => $perPage,
            ]);
            return;
        }

        $total = isset($res['headers']['x-wp-total']) ? (int)$res['headers']['x-wp-total'] : 0;
        $rawPosts = json_decode($res['body'], true);

        if (!is_array($rawPosts)) {
            $rawPosts = [];
        }

        $posts = array_map([self::class, 'mapWpPost'], $rawPosts);

        echo json_encode([
            'posts'   => $posts,
            'total'   => $total,
            'page'    => $page,
            'perPage' => $perPage,
        ]);
    }

    private static function getPostBySlug(string $slug): void {
        $url = self::WP_API_BASE . '/posts?slug=' . urlencode($slug) . '&_embed=1';
        $res = self::fetchWp($url);

        if ($res['status'] !== 200) {
            http_response_code(404);
            echo json_encode(['error' => 'Post not found']);
            return;
        }

        $rawPosts = json_decode($res['body'], true);
        if (!is_array($rawPosts) || empty($rawPosts)) {
            http_response_code(404);
            echo json_encode(['error' => 'Post not found']);
            return;
        }

        $post = self::mapWpPost($rawPosts[0]);
        echo json_encode($post);
    }

    private static function lookupCategoryId(string $categoryName): ?int {
        $url = self::WP_API_BASE . '/categories?search=' . urlencode($categoryName) . '&per_page=10';
        $res = self::fetchWp($url);
        if ($res['status'] !== 200) return null;

        $cats = json_decode($res['body'], true);
        if (!is_array($cats)) return null;

        $key = mb_strtolower($categoryName);
        foreach ($cats as $cat) {
            if (mb_strtolower($cat['name']) === $key) {
                return (int)$cat['id'];
            }
        }
        foreach ($cats as $cat) {
            if (strpos(mb_strtolower($cat['name']), $key) !== false) {
                return (int)$cat['id'];
            }
        }
        return null;
    }

    private static function mapWpPost(array $post): array {
        $title = strip_tags($post['title']['rendered'] ?? '');
        $excerpt = strip_tags($post['excerpt']['rendered'] ?? '');
        $content = $post['content']['rendered'] ?? '';
        $date = $post['date'] ?? date('c');

        $categories = [];
        if (isset($post['_embedded']['wp:term'][0]) && is_array($post['_embedded']['wp:term'][0])) {
            foreach ($post['_embedded']['wp:term'][0] as $term) {
                if (isset($term['name'])) {
                    $categories[] = $term['name'];
                }
            }
        }

        $featuredImageUrl = $post['_embedded']['wp:featuredmedia'][0]['source_url'] ?? null;
        $author = $post['_embedded']['author'][0]['name'] ?? null;

        return [
            'id'               => (int)$post['id'],
            'title'            => html_entity_decode($title),
            'slug'             => $post['slug'] ?? '',
            'excerpt'          => html_entity_decode($excerpt),
            'content'          => $content,
            'date'             => $date,
            'categories'       => $categories,
            'featuredImageUrl' => $featuredImageUrl,
            'author'           => $author,
        ];
    }

    private static function fetchWp(string $url): array {
        $ch = curl_init();
        curl_setopt($ch, CURLOPT_URL, $url);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($ch, CURLOPT_HEADER, true);
        curl_setopt($ch, CURLOPT_TIMEOUT, 8);
        curl_setopt($ch, CURLOPT_USERAGENT, 'BrandEnvoyPHP/1.0');

        $response = curl_exec($ch);
        $status = curl_getinfo($ch, CURLINFO_HTTP_CODE);
        $headerSize = curl_getinfo($ch, CURLINFO_HEADER_SIZE);
        curl_close($ch);

        if ($response === false) {
            return ['status' => 500, 'headers' => [], 'body' => ''];
        }

        $headerStr = substr($response, 0, $headerSize);
        $body = substr($response, $headerSize);

        $headers = [];
        foreach (explode("\r\n", $headerStr) as $line) {
            if (strpos($line, ':') !== false) {
                list($k, $v) = explode(':', $line, 2);
                $headers[strtolower(trim($k))] = trim($v);
            }
        }

        return ['status' => $status, 'headers' => $headers, 'body' => $body];
    }
}
