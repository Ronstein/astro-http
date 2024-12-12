import type { APIRoute } from "astro";
import { getCollection, getEntry } from "astro:content";

//Si esta en false esta pagina esta renderizada en el server , no es statica
//por lo cual esta sujeta a cambios por el javascript, ademas puede obtener los params de una url

export const prerender = false;

export const GET: APIRoute = async ({ params, request }) => {

    //console.log(request);
    const url = new URL(request.url);
    const slug = url.searchParams.get('slug');
    //console.log(slug);
    //404

    if (slug) {
        const post = await getEntry('blog', slug);
        if (post) {
            return new Response(JSON.stringify(post),
                {
                    status: 200,
                    headers: {
                        'Content-Type': 'application/json',
                    }
                });
        }
        if (!post) {
            return new Response(JSON.stringify({ msg: `Post ${slug} not found` }),
                {
                    status: 404,
                    headers: {
                        'Content-Type': 'application/json',
                    }
                });
        }

    }

    const blogPosts = await getCollection('blog');

    return new Response(JSON.stringify(blogPosts),
        {
            status: 200,
            headers: {
                'Content-Type': 'application/json',
            }
        });
}

// export const GET: APIRoute = async ({ params, request }) => {
//     const blogPosts = await getCollection('blog');
//     //console.log(request);
//     const url = new URL(request.url);
//     const slug = url.searchParams.get('slug');
//     //console.log(slug);
//     //404

//     if (!slug) {
//         return new Response(JSON.stringify(blogPosts),
//             {
//                 status: 200,
//                 headers: {
//                     'Content-Type': 'application/json',
//                 }
//             });
//     }

//     const post = blogPosts.find(p => p.id === slug);
//     // 7console.log(post);


//     if (!post) {
//         return new Response('Page not found',
//             {
//                 status: 404,
//                 headers: {
//                     'Content-Type': 'application/json',
//                 }
//             });
//     }

//     return new Response(JSON.stringify(post),
//         {
//             status: 200,
//             headers: {
//                 'Content-Type': 'application/json',
//             }
//         });



// }