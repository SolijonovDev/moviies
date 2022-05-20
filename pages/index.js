import Image from "next/image";
import { Layout } from "../components/Layout";
import styles from "../styles/home.module.scss";
import { useEffect, useState, FC } from "react";
import Router, { withRouter } from "next/router";
import Pagination from "@mui/material/Pagination";
import { useAppDispatch, useAppSelector } from "../hooks/redux";
import { setPagination } from "../store/reducers/moviesSlice";
import { Loading } from "../components/Loading";



const Home= (props) => {
  const dispatch = useAppDispatch();
  const { paginationPage } = useAppSelector((state) => state.movies);
  const [isLoading, setLoading] = useState(false);
  const startLoading = () => setLoading(true);
  const stopLoading = () => setLoading(false);

  const pagginationHandler = (page) => {
    dispatch(setPagination(page));

    props.router.push({
      pathname: props.router.pathname,
      query: { page },
    });
  };

  useEffect(() => {
    if (paginationPage) {
      pagginationHandler(paginationPage);
    }

    Router.events.on("routeChangeStart", startLoading);
    Router.events.on("routeChangeComplete", stopLoading);
    return () => {
      Router.events.off("routeChangeStart", startLoading);
      Router.events.off("routeChangeComplete", stopLoading);
    };
  }, []);

  return (
    <Layout title={"Home page"}>
      {isLoading && <Loading />}
      {
        !isLoading && <div className={styles.home}>
        <div className="container">
          <div className={styles.inner}>
            <h2 className={styles.home_name}>Filmlar</h2>
            <div className={styles.home_items}>
              {props.movies.map((v) => (
                <div
                  onClick={() => props.router.push(`/watch/${v.id}`)}
                  key={v.id}
                  className={styles.item}
                >
                  <div className={styles.item_photo}>
                    <Image
                      loader={() => v.files.poster_url}
                      src={v.files.poster_url}
                      width={500}
                      height={200}
                      layout="fill"
                      alt="photo"
                    />
                  </div>
                  <h4>{v.title}</h4>
                </div>
              ))}
            </div>

            <div className={styles.home_pagination}>
              <Pagination
                size="medium"
                color="primary"
                variant="text"
                count={props.count}
                page={+props.router.query.page || 1}
                onChange={(_, value) => pagginationHandler(value)}
              />
            </div>
          </div>
        </div>
      </div>
      }
    </Layout>
  );
};

Home.getInitialProps = async ({ query }) => {
  const page = query.page || 1;
  const res = await fetch(
    `https://api.itv.uz/api/content/main/2/list?page=${page}&user=a71651276800s055120e1a6ffaa1ec27`
  );
  const json = await res.json();

  return {
    count: Math.ceil(json.data.total_items / json.data.items_per_page),
    movies: json.data.movies,
    code: json.code,
  };
};

export default withRouter(Home);
