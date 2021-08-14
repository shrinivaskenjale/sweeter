import c from "../../styles/compose.module.css";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/client";
import { useRouter } from "next/router";
import ImagePreview from "../../components/image-preview";

const ComposePage = (props) => {
  const [session, sessionloading] = useSession();
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [imageData, setImageData] = useState({
    imageUrl: null,
    imageName: null,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const createPostHandler = async () => {
    setLoading(true);
    setError(null);

    try {
      let imageUrl;
      if (imageFile) {
        const fileForm = new FormData();
        fileForm.append("file", imageFile);
        fileForm.append("upload_preset", process.env.NEXT_PUBLIC_UPLOAD_PRESET);
        const cloudinaryRes = await fetch(
          process.env.NEXT_PUBLIC_CLOUDINARY_URL,
          {
            method: "POST",
            body: fileForm,
          }
        );
        console.log(cloudinaryRes);
        const file = await cloudinaryRes.json();
        imageUrl = file.secure_url;
      }

      const res = await fetch("/api/compose/sweet", {
        method: "POST",
        body: JSON.stringify({
          title,
          content,
          imageUrl,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!res.ok) {
        throw new Error("Something went wrong.");
      }
      const data = await res.json();
      setTitle("");
      setContent("");
      router.push("/home");
    } catch (error) {
      setError(error.message);
    }
    setLoading(false);
  };

  const titleInputChangeHandler = (event) => {
    setTitle(event.target.value);
  };
  const contentInputChangeHandler = (event) => {
    setContent(event.target.value);
  };
  const formSubmitHandler = (event) => {
    event.preventDefault();
    if (title.trim().length < 5 || content.trim().length < 10) {
      setError(
        "Title should be minimum 5 characters long and content should be minimum 10 characters long."
      );
      return;
    }

    createPostHandler();
  };

  const showPreviewHandler = (event) => {
    setError(null);
    const file = event.target.files[0];
    if (file && file.type.substr(0, 5) === "image" && file.size <= 500000) {
      setImageFile(file);
    } else {
      setError("Choose image file with size less than 500 Kilobytes.");
      setImageFile(null);
      setImageData({
        imageUrl: null,
        imageName: null,
      });
    }
  };

  useEffect(() => {
    let imageUrl = null;
    let imageName = null;
    if (imageFile) {
      imageUrl = URL.createObjectURL(imageFile);
      imageName = imageFile.name;
      setImageData({
        imageName,
        imageUrl,
      });
    }

    return () => {
      if (imageFile) {
        // console.warn("cleaning up");
        URL.revokeObjectURL(imageUrl);
      }
    };
  }, [imageFile]);

  if (sessionloading) return <p className="loading">Loading...</p>;

  if (!sessionloading && !session) {
    router.replace("/");
    return null;
  }

  return (
    <section className={c.compose}>
      <h1>Create New Sweet</h1>
      <form onSubmit={formSubmitHandler}>
        {error && <p className={c.error}>{error}</p>}

        <div className={c.control}>
          <label htmlFor="title">Title</label>
          <input
            type="text"
            id="title"
            required
            value={title}
            onChange={titleInputChangeHandler}
          />
        </div>
        <div className={c.control}>
          <label htmlFor="content">Content</label>
          <textarea
            id="content"
            cols="30"
            rows="10"
            value={content}
            required
            onChange={contentInputChangeHandler}
          ></textarea>
        </div>
        <div className={`${c.control} ${c.file}`}>
          <label htmlFor="image">Upload image</label>
          <input
            type="file"
            id="image"
            // capture="environment"
            accept="image/*"
            onChange={showPreviewHandler}
          />
        </div>
        {imageData.imageUrl && <ImagePreview imageData={imageData} />}
        <div className={c.actions}>
          <button disabled={loading} type="submit">
            {loading ? "Loading..." : "Create"}
          </button>
        </div>
      </form>
    </section>
  );
};

export default ComposePage;
