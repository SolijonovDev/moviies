import { useEffect,FC } from "react";
import { Layout } from "../../components/Layout";
import Image from "next/image";
import { useState } from "react";
import Router from "next/router";
import { Loading } from "../../components/Loading";
import s from "../../styles/watch.module.scss";
import { GetServerSideProps } from "next";
import { MovieTypes } from '../../types/index';



const Watch = ({ movie }) => {
  const { title, description, year, files, countries_str, genres_str } = movie;
  const src = files.poster_url;
  const [isLoading, setLoading] = useState(false);

  const startLoading = () => setLoading(true);
  const stopLoading = () => setLoading(false);

  useEffect(() => {
    Router.events.on("routeChangeStart", startLoading);
    Router.events.on("routeChangeComplete", stopLoading);
    return () => {
      Router.events.off("routeChangeStart", startLoading);
      Router.events.off("routeChangeComplete", stopLoading);
    };
  }, []);

  return (
    <div>
      <Layout title={title}>
        {isLoading && <Loading />}
        {!isLoading && (
          <div className={s.movie}>
            <div className="container">
              <div className={s.inner}>
                <div className={s.movie_video}>
                  <iframe
                    src="https://www.youtube.com/embed/o9aaoiyJlcM"
                    title="YouTube video player"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  ></iframe>
                </div>
                <div className={s.movie_info}>
                  <div className={s.movie_photo}>
                    <Image
                      loader={() => src}
                      src={src}
                      width={500}
                      height={200}
                      layout="fill"
                      alt="photo"
                    />
                  </div>
                  <div className={s.movie_texts}>
                    <h2>{title}</h2>
                    <p>{description}</p>
                    <p>Yil: {year}</p>
                    <p>Mamlakat: {countries_str}</p>
                    <p>{genres_str}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </Layout>
    </div>
  );
};

export default Watch;

export const getServerSideProps = async({ params })=> {
  const id=params.id || 1;
  const res = await fetch(
    `https://api.itv.uz/api/content/main/2/show/${id}?&user=a71651276800s055120e1a6ffaa1ec27`
  );
  const json = await res.json();
  return {
    props: { movie: json.data.movie },
  };
}
