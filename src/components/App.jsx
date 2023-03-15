import { useEffect, useState } from "react";
import { nanoid } from 'nanoid'
import { Searchbar } from "./Searchbar/Searchbar";
import * as api from './services/api'
import { ImageGallery } from "./ImageGallery/ImageGallery";
import { Button } from "./Button/Button";
import { GlobalStyle } from "./GlobalStyle.styled";
import { Layout } from "./Layout.styled";
import { Loader } from "./Loader";
export const App = () =>
{
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [error, seteError] = useState(null);
  const [hits, setHits] = useState([]);
  const [isVisible, setIsVisible] = useState(false);
  const [isLoad, setIsLoad] = useState(false);
  const [empty, setEmpty] = useState(false);
  const [loader, setLoader] = useState(false);
const [reqId, setReqId] = useState(null);

  useEffect(() =>{
    const getImages = async (query, page) =>
    {
      if (!query) return;
      setIsLoad(true);
      setLoader(true);
      try {
        setLoader(true);
        const { hits, total, totalHits } = await api.getImages(query, page)
        if (hits.length === 0) { setEmpty(true) }
        console.log({ hits, total, totalHits });
        setHits(prevState => (
          [...prevState, ...hits]));
        setIsVisible(hits.length >= 12)
      
      } catch (error) {
        seteError(error)
      } finally {
        setIsLoad(false);
        setLoader(false);
      }
    }
      getImages(search, page);
    }, [search, page,reqId]);
  
  const showMoreImg = () => setPage(prev => (prev.page + 1));
  

    const handleSubmit = ({ value }) =>
    {setReqId(nanoid())
      setSearch(value);
      setPage(1);
      seteError(null);
      setHits([]);
      setIsVisible(false);
      setIsLoad(false);
      setEmpty(false);
    }
 
 
 
    return (<Layout>
      <GlobalStyle />
      <Searchbar onSubmit={handleSubmit} />
      {loader && <Loader />}
      <ImageGallery hits={hits} />
      {isVisible && <Button onClick={showMoreImg} isLoad={isLoad} />}
      {error && <p>Oops</p>}
      {empty && <p>Sorry. There are no images...</p>}
    </Layout>)
  }
