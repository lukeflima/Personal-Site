import { useRouter } from 'next/router';
import { useEffect } from 'react';

const Page404 = () => {
    const route = useRouter();

    useEffect(() => route.push("/"));

    return <></>;
}

export default Page404;