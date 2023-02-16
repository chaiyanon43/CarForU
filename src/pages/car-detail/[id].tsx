import { useRouter } from "next/router"

const Details=()=>{
    const router = useRouter();
    const carId = router.query.id
    console.log(carId)
    return (
        <>this dynamic detail</>
    )
}
export default Details