import { useRouter } from "next/router";
import { useSession } from "next-auth/client";

import { useSweets } from "../../hooks/use-sweets";
import Dashboard from "../../components/dashboard.js";
import Sweets from "../../components/sweets";
import Paginator from "../../components/paginator";
// import { useEffect } from "react";

const UserPage = (props) => {
  const [session, sessionloading] = useSession();
  const router = useRouter();

  const userId = router.query.userId;

  const {
    sweets,
    user,
    totalSweets,
    currentPage,
    error,
    loading,
    deleteSweetHandler,
    fetchSweetsHandler,
  } = useSweets(`/api/user/${userId}/sweets`);

  // useEffect(()=>{},[])

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
      {user && <Dashboard user={user} />}
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
export default UserPage;
