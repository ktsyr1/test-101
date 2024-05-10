import paytabs from 'paytabs_pt2'

export async function GET(req: Request) {
    console.log({ callback: req });

    return new Response(JSON.stringify({ data: "test" }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },

    })
}
