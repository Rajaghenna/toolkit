import ImageBar from "./getimagesfromdb/_components/ImageBar";

export default function ImagesLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      {children}
    </div>
  );
}
