import { useRouter } from 'next/router';
import { useEffect } from 'react';

const page404 = () =>{
    const route = useRouter();
    
    useEffect(() => route.push("/"), []);

    return <></>;
}

export default page404;