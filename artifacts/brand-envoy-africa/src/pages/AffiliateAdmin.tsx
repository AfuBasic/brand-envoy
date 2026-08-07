import { Layout } from "@/components/layout/Layout";
import { useState } from "react";
import { 
  useListAffiliates, 
  useCreateAffiliate, 
  useUpdateAffiliate, 
  useDeleteAffiliate, 
  usePublishAffiliate,
  useGetAffiliateStats
} from "@workspace/api-client-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";
import { Pencil, Trash2, Plus, RefreshCw, BarChart2 } from "lucide-react";

export function AffiliateAdmin() {
  const queryClient = useQueryClient();
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [formData, setFormData] = useState({
    productName: "",
    affiliateUrl: "",
    productInfo: "",
    imageUrl: "",
    category: "",
    published: false
  });

  const { data: stats } = useGetAffiliateStats({
    query: { queryKey: ["/api/affiliates/stats"] }
  });

  const { data: affiliates, isLoading } = useListAffiliates(
    {},
    { query: { queryKey: ["/api/affiliates"] } }
  );

  const createMutation = useCreateAffiliate();
  const updateMutation = useUpdateAffiliate();
  const deleteMutation = useDeleteAffiliate();
  const publishMutation = usePublishAffiliate();

  const handleOpenForm = (affiliate?: any) => {
    if (affiliate) {
      setEditingId(affiliate.id);
      setFormData({
        productName: affiliate.productName,
        affiliateUrl: affiliate.affiliateUrl,
        productInfo: affiliate.productInfo,
        imageUrl: affiliate.imageUrl || "",
        category: affiliate.category || "",
        published: affiliate.published
      });
    } else {
      setEditingId(null);
      setFormData({
        productName: "",
        affiliateUrl: "",
        productInfo: "",
        imageUrl: "",
        category: "",
        published: false
      });
    }
    setIsFormOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (editingId) {
      updateMutation.mutate(
        { id: editingId, data: formData },
        {
          onSuccess: () => {
            toast.success("Affiliate product updated");
            queryClient.invalidateQueries({ queryKey: ["/api/affiliates"] });
            queryClient.invalidateQueries({ queryKey: ["/api/affiliates/stats"] });
            setIsFormOpen(false);
          }
        }
      );
    } else {
      createMutation.mutate(
        { data: formData },
        {
          onSuccess: () => {
            toast.success("Affiliate product created");
            queryClient.invalidateQueries({ queryKey: ["/api/affiliates"] });
            queryClient.invalidateQueries({ queryKey: ["/api/affiliates/stats"] });
            setIsFormOpen(false);
          }
        }
      );
    }
  };

  const handleDelete = (id: number) => {
    if (confirm("Are you sure you want to delete this product?")) {
      deleteMutation.mutate(
        { id },
        {
          onSuccess: () => {
            toast.success("Product deleted");
            queryClient.invalidateQueries({ queryKey: ["/api/affiliates"] });
            queryClient.invalidateQueries({ queryKey: ["/api/affiliates/stats"] });
          }
        }
      );
    }
  };

  const handleTogglePublish = (id: number, currentStatus: boolean) => {
    publishMutation.mutate(
      { id, data: { published: !currentStatus } },
      {
        onSuccess: () => {
          toast.success(`Product ${!currentStatus ? 'published' : 'unpublished'}`);
          queryClient.invalidateQueries({ queryKey: ["/api/affiliates"] });
          queryClient.invalidateQueries({ queryKey: ["/api/affiliates/stats"] });
        }
      }
    );
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-12 max-w-6xl">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold flex items-center gap-2">
            <BarChart2 className="h-8 w-8 text-primary" />
            Affiliate Dashboard
          </h1>
          <Button onClick={() => handleOpenForm()}>
            <Plus className="h-4 w-4 mr-2" /> Add Product
          </Button>
        </div>

        {/* Stats */}
        {stats && (
          <div className="grid grid-cols-3 gap-6 mb-12">
            <div className="bg-card border p-6 rounded-xl shadow-sm">
              <div className="text-sm font-medium text-muted-foreground mb-1">Total Products</div>
              <div className="text-3xl font-bold">{stats.total}</div>
            </div>
            <div className="bg-card border p-6 rounded-xl shadow-sm">
              <div className="text-sm font-medium text-muted-foreground mb-1">Published</div>
              <div className="text-3xl font-bold text-green-600">{stats.published}</div>
            </div>
            <div className="bg-card border p-6 rounded-xl shadow-sm">
              <div className="text-sm font-medium text-muted-foreground mb-1">Drafts</div>
              <div className="text-3xl font-bold text-amber-500">{stats.unpublished}</div>
            </div>
          </div>
        )}

        {isFormOpen && (
          <div className="bg-card border p-6 rounded-xl shadow-sm mb-12 animate-in slide-in-from-top-4">
            <h2 className="text-xl font-bold mb-6">{editingId ? 'Edit Product' : 'Add New Product'}</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Product Name *</label>
                  <Input 
                    value={formData.productName} 
                    onChange={e => setFormData({...formData, productName: e.target.value})} 
                    required 
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Category</label>
                  <Input 
                    value={formData.category} 
                    onChange={e => setFormData({...formData, category: e.target.value})} 
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium">Affiliate URL *</label>
                <Input 
                  value={formData.affiliateUrl} 
                  onChange={e => setFormData({...formData, affiliateUrl: e.target.value})} 
                  required 
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Image URL</label>
                <Input 
                  value={formData.imageUrl} 
                  onChange={e => setFormData({...formData, imageUrl: e.target.value})} 
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Product Info *</label>
                <Textarea 
                  value={formData.productInfo} 
                  onChange={e => setFormData({...formData, productInfo: e.target.value})} 
                  required 
                  className="min-h-[100px]"
                />
              </div>

              <div className="flex items-center space-x-2 pt-2">
                <Checkbox 
                  id="published" 
                  checked={formData.published}
                  onCheckedChange={(checked) => setFormData({...formData, published: checked === true})}
                />
                <label htmlFor="published" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                  Publish immediately
                </label>
              </div>

              <div className="flex gap-2 pt-4">
                <Button type="submit" disabled={createMutation.isPending || updateMutation.isPending}>
                  {editingId ? 'Save Changes' : 'Create Product'}
                </Button>
                <Button type="button" variant="outline" onClick={() => setIsFormOpen(false)}>
                  Cancel
                </Button>
              </div>
            </form>
          </div>
        )}

        <div className="bg-card border rounded-xl overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="bg-muted text-muted-foreground uppercase">
                <tr>
                  <th className="px-6 py-4 font-medium">Product</th>
                  <th className="px-6 py-4 font-medium">Category</th>
                  <th className="px-6 py-4 font-medium">Status</th>
                  <th className="px-6 py-4 font-medium text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {isLoading ? (
                  <tr>
                    <td colSpan={4} className="px-6 py-8 text-center text-muted-foreground">Loading...</td>
                  </tr>
                ) : !affiliates || affiliates.length === 0 ? (
                  <tr>
                    <td colSpan={4} className="px-6 py-8 text-center text-muted-foreground">No products found.</td>
                  </tr>
                ) : (
                  affiliates.map((affiliate) => (
                    <tr key={affiliate.id} className="hover:bg-muted/50 transition-colors">
                      <td className="px-6 py-4 font-medium">{affiliate.productName}</td>
                      <td className="px-6 py-4">{affiliate.category || '-'}</td>
                      <td className="px-6 py-4">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${affiliate.published ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'}`}>
                          {affiliate.published ? 'Published' : 'Draft'}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex justify-end gap-2">
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            onClick={() => handleTogglePublish(affiliate.id, affiliate.published)}
                            disabled={publishMutation.isPending}
                          >
                            <RefreshCw className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm" onClick={() => handleOpenForm(affiliate)}>
                            <Pencil className="h-4 w-4" />
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            className="text-destructive hover:text-destructive hover:bg-destructive/10"
                            onClick={() => handleDelete(affiliate.id)}
                            disabled={deleteMutation.isPending}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </Layout>
  );
}