import Image from "next/image";
import { useSession } from "next-auth/client";
import Link from "next/link";
import c from "./sweet.module.css";

const Sweet = (props) => {
  const [session] = useSession();
  const { creator, title, content, imageUrl } = props.sweet;

  return (
    <article className={c.sweet}>
      <div className={c.userImage}>
        <Image src={creator.image} alt={creator.name} />
      </div>
      <div className={c.sweetContent}>
        <div className={c.name}>
          <Link href={`/${creator._id}`}>
            <a>{creator.name}</a>
          </Link>
        </div>
        <div className={c.title}>{title}</div>
        <div className={c.content}>{content}</div>
        {imageUrl && (
          <div className={c.sweetImage}>
            <Image src={imageUrl} alt={title} />
          </div>
        )}

        <div>
          {session && creator._id === session.user._id && (
            <button className={c.deleteBtn} onClick={props.deleteSweet}>
              Delete
            </button>
          )}
        </div>
      </div>
    </article>
  );
};

export default Sweet;
