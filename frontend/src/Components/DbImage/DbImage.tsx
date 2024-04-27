export default function DbImage({
  imageData,
  altText,
  className,
}: {
  imageData: ArrayBuffer | undefined;
  altText?: string | undefined;
  className?: string | undefined;
}) {
  // TODO: Add alternative image for no image data
  return (
    <img
      className={className}
      src={`data:image/jpeg;base64,${imageData}`}
      alt={altText}
    />
  );
}
