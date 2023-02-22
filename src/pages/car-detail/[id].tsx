import { useRouter } from "next/router"
import { Galleria } from 'primereact/galleria';
import style from '../../styles/DetailPage.module.css'

const Details = () => {
    const router = useRouter();
    const carId = router.query.id
    const responsiveOptions = [
        {
            breakpoint: '1024px',
            numVisible: 5
        },
        {
            breakpoint: '768px',
            numVisible: 3
        },
        {
            breakpoint: '560px',
            numVisible: 1
        }
    ];
    const itemTemplate = (item) => {
        return <img src={item.itemImageSrc} onError={(e) => e.target.src = 'https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png'} alt={item.alt} style={{ width: '100%', display: 'block' }} />;
    }

    const thumbnailTemplate = (item) => {
        return <img src={item.thumbnailImageSrc} onError={(e) => e.target.src = 'https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png'} alt={item.alt} style={{ display: 'block' }} />;
    }
    const images = [
        {
            itemImageSrc: "https://img.icarcdn.com/autospinn/body/000000156268_f97d5e35_dca6_4ed4_8e5a_225038915280.jpeg",
            thumbnailImageSrc: "https://img.icarcdn.com/autospinn/body/000000156268_f97d5e35_dca6_4ed4_8e5a_225038915280.jpeg",
            alt: "Description for Image 1",
            title: "Title 1"
        },
        {
            itemImageSrc: "https://upload.wikimedia.org/wikipedia/commons/c/cb/Honda_Civic_Type_R_%28FK%3B_France%29_front_view.jpg",
            thumbnailImageSrc: "https://upload.wikimedia.org/wikipedia/commons/c/cb/Honda_Civic_Type_R_%28FK%3B_France%29_front_view.jpg",
            alt: "Description for Image 2",
            title: "Title 2"
        },
        {
            itemImageSrc: "https://upload.wikimedia.org/wikipedia/commons/c/cb/Honda_Civic_Type_R_%28FK%3B_France%29_front_view.jpg",
            thumbnailImageSrc: "https://upload.wikimedia.org/wikipedia/commons/c/cb/Honda_Civic_Type_R_%28FK%3B_France%29_front_view.jpg",
            alt: "Description for Image 2",
            title: "Title 2"
        },
        {
            itemImageSrc: "https://upload.wikimedia.org/wikipedia/commons/c/cb/Honda_Civic_Type_R_%28FK%3B_France%29_front_view.jpg",
            thumbnailImageSrc: "https://upload.wikimedia.org/wikipedia/commons/c/cb/Honda_Civic_Type_R_%28FK%3B_France%29_front_view.jpg",
            alt: "Description for Image 2",
            title: "Title 2"
        },
        {
            itemImageSrc: "https://upload.wikimedia.org/wikipedia/commons/c/cb/Honda_Civic_Type_R_%28FK%3B_France%29_front_view.jpg",
            thumbnailImageSrc: "https://upload.wikimedia.org/wikipedia/commons/c/cb/Honda_Civic_Type_R_%28FK%3B_France%29_front_view.jpg",
            alt: "Description for Image 2",
            title: "Title 2"
        },

    ]
    return (
        <div className={style['detail-page-container']}>
            <div className={style['card-images']}>
                <Galleria value={images}  numVisible={5} circular style={{ maxWidth: '640px' }}
                    showItemNavigators showItemNavigatorsOnHover item={itemTemplate} thumbnail={thumbnailTemplate} />
            </div>
        </div>
    )
}
export default Details