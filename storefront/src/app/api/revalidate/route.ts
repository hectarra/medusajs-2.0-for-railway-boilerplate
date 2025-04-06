import { NextResponse } from 'next/server';
import Cors from 'cors';
import { revalidatePath } from 'next/cache';

// Inicializando el middleware CORS
const cors = Cors({
  methods: ['POST', 'GET', 'HEAD', 'OPTIONS'],
});

// Función auxiliar para ejecutar middleware
function runMiddleware(req: Request, res: Response, fn: Function) {
  return new Promise((resolve, reject) => {
    fn(req, res, (result: any) => {
      if (result instanceof Error) {
        return reject(result);
      }
      return resolve(result);
    });
  });
}

/**
 * API para revalidar páginas
 */
export async function POST(request: Request) {
  const res = new NextResponse();

  // Ejecutar el middleware CORS
  await runMiddleware(request, res, cors);

  // Obtener los datos del cuerpo de la solicitud
  const hookData = await request.json();

  // Extraer el parámetro "secret" de la URL
  const url = new URL(request.url);
  const secret = url.searchParams.get('secret');

  // Extraer las URLs de los datos del hook
  const urls = [hookData.newValue, hookData.previousValue]
    .map((content: any) => {
      return content?.query?.find(
        (attribute: any) => attribute.property === 'urlPath'
      )?.value;
    })
    .filter(Boolean);

  // Verificar si hay URLs válidas y si el secreto es correcto
  if (urls.length > 0 && secret === process.env.REVALIDATE_SECRET) {
    // Revalidar cada página usando revalidatePath
    urls.forEach((url: string) => {
      revalidatePath(url); // Invalida la caché para la ruta específica
    });

    return NextResponse.json({ revalidated: true });
  }

  return NextResponse.json({ ok: true });
}