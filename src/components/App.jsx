import { Component } from "react";
import Searchbar from "./Searchbar";
import { fetchPhotos } from "../shared/servises/fetchPhotos"
import ImageGallery from "./ImageGallery";
import Button from "shared/components/button/Button";
import styles from './app.module.css'
// import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
// import * as basicLightbox from 'basiclightbox'

class App extends Component  {
  state = {
    items: [],
    loading: false,
    error: null,
    q: '',
    page: 1,
  }

  async componentDidUpdate(prevProps, prevState) {
    const {q, page} = this.state;
       if(q !== prevState.q || page > prevState.page) {
           this.setState({
               loading: true,
               error: null
           });

            try {
              const items = await fetchPhotos(q, page);
                this.setState(prevState => {
                    return {
                        items: [...prevState.items, ...items],
                        loading: false
                    }
                })
            } catch (error) {
                this.setState({
                    loading: false,
                    error: error.message
                })
            }
       }
  }

   setSearch = ({q}) => {
        this.setState({
            q
        })
   }
  
  loadMore = () => {
    this.setState(({ page }) => {
      return {
        page: page +1
      }
    })
  }
    
  
  render() {
    const { items, loading } = this.state;
    const { setSearch, loadMore } = this;
    return (
      <div>
        <Searchbar onSubmit={setSearch} />
        {loading && <p>...Loading</p>}
        {Boolean(items.length) && <ImageGallery items={items} />}
         {!loading && Boolean(items.length) && (
            <div className={styles.btnContainer}>
                <Button text="Load more" onClick={loadMore} />
            </div>)}
  </div>
)
  }
}

export default App