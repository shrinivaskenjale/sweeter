import { useSession } from "next-auth/client";
import { useRouter } from "next/router";
import { useSweets } from "../hooks/use-sweets";
import Sweets from "../components/sweets";

import Paginator from "../components/paginator";

const HomePage = (props) => {
  const [session, sessionloading] = useSession();
  const router = useRouter();

  const {
    sweets,
    totalSweets,
    currentPage,
    error,
    loading,
    deleteSweetHandler,
    fetchSweetsHandler,
  } = useSweets("/api/sweets");

  if (sessionloading) return <p className="loading">Loading...</p>;

  if (!sessionloading && !session) {
    router.replace("/");
    return null;
  }

  let content = <p className="noResults">Found no sweets.</p>;

  if (sweets.length > 0) {
    content = <Sweets sweets={sweets} deleteSweet={deleteSweetHandler} />;
  }

  if (error) {
    content = <p className="error">{error}</p>;
  }
  if (loading) {
    content = <p className="loading">Loading...</p>;
  }

  return (
    <section>
      {content}

      {!loading && !error && (
        <Paginator
          onPrevious={() => fetchSweetsHandler("previous")}
          onNext={() => fetchSweetsHandler("next")}
          lastPage={Math.ceil(totalSweets / 10)} // 10 is per page limit
          currentPage={currentPage}
        />
      )}
    </section>
  );
};
export default HomePage;
