import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/router";

export const useSweets = (endPoint) => {
  const [sweets, setSweets] = useState([]);
  const [user, setUser] = useState();
  const [totalSweets, setTotalSweets] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const router = useRouter();
  const fetchSweetsHandler = useCallback(
    async (direction) => {
      setLoading(true);
      setError(null);
      if (direction) {
        setSweets([]);
      }
      let page = currentPage;
      if (direction === "next") {
        page++;
        setCurrentPage(page);
      }
      if (direction === "previous") {
        page--;
        setCurrentPage(page);
      }

      try {
        const res = await fetch(`${endPoint}?page=${page}`);
        if (!res.ok) {
          throw new Error("Something went wrong.");
        }
        const data = await res.json();
        setSweets(data.sweets);
        setTotalSweets(data.totalSweets);
        if (data.user) {
          setUser(data.user);
        }
      } catch (error) {
        setError(error.message);
      }
      setLoading(false);
    },
    [currentPage, router.isReady, user]
  );

  const deleteSweetHandler = async (sweetId) => {
    console.log(sweetId);
    try {
      const res = await fetch(`/api/sweet/${sweetId}`, {
        method: "DELETE",
      });
      if (!res.ok) {
        throw new Error("Sweet not found.");
      }
      const data = await res.json();
      setSweets((prevSweets) => {
        const updatedSweets = prevSweets.filter((sweet) => {
          return sweet._id !== sweetId;
        });
        return updatedSweets;
      });
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    if (router.isReady) {
      fetchSweetsHandler();
    }
  }, [router.isReady]);

  return {
    sweets,
    user,
    totalSweets,
    currentPage,
    error,
    loading,
    deleteSweetHandler,
    fetchSweetsHandler,
  };
};
