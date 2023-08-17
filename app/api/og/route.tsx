import { ImageResponse, NextRequest } from 'next/server'

export const runtime = 'edge'

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const title = searchParams.get('title')
  const author = searchParams.get('author')
  if (!title) {
    return new Response('Not Found', { status: 404 })
  }

  return new ImageResponse(
    (
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          width: '100%',
          height: '100%',
        }}
      >
        <img
          src="https://recastfile.com/blog-cover-1.png"
          style={{
            position: 'absolute',
            width: 1200,
            height: 600,
          }}
        />
        <div
          style={{
            position: 'absolute',
            bottom: '20px',
            left: '20px',
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <img
            src="https://recastfile.com/logo.png"
            style={{
              width: 50,
              height: 50,
              marginRight: '10px',
            }}
          />
          <div
            style={{
              fontSize: '24px',
              fontWeight: 'bold',
            }}
          >
            Recast
          </div>
        </div>
        <div
          style={{
            position: 'absolute',
            bottom: '20px',
            right: '20px',
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <div
            style={{
              fontSize: '24px',
              fontWeight: 'bold',
            }}
          >
            {author}
          </div>
        </div>
        <div
          style={{
            maxWidth: '80%',
            textAlign: 'center',
            color: '#171717',
            fontSize: '84px',
            fontWeight: 'bold',
          }}
        >
          {title}
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 600,
    }
  )
}
