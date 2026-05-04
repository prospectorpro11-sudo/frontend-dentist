import EditProductView from "@/editor/views/EditProductView";

type EditProductPageProps = {
  params: Promise<{
    productId: string;
  }>;
};

const EditProductPage = async ({ params }: EditProductPageProps) => {
  const { productId } = await params;
  return <EditProductView productId={productId} />;
};

export default EditProductPage;
