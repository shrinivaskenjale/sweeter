import Image from "next/image";
import c from "./image-preview.module.css";
const ImagePreview = (props) => {
  const { imageName, imageUrl } = props.imageData;
  return (
    <div className={c.imagePreview}>
      <Image src={imageUrl} alt={imageName} />
    </div>
  );
};
export default ImagePreview;
