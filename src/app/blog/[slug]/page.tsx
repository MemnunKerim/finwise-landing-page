interface Props { params: { slug: string } }

export const generateStaticParams = () => []; // MDX eklediğinde doldur
export const metadata = { title: "Blog Detay – PaletDepo" };

export default function BlogPost({ params }: Props) {
  return (
    <div className="pt-24 pb-16 text-center">
      <h1 className="text-4xl font-bold mb-4">{params.slug}</h1>
      <p className="text-foreground-accent">İçerik en kısa sürede eklenecek.</p>
    </div>
  );
}
