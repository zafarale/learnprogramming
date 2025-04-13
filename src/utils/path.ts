export function getPath(path: string): string {
    // Remove leading slash if present
    const cleanPath = path.startsWith('/') ? path.slice(1) : path;
    const base = import.meta.env.BASE_URL.replace(/\/$/, '');
    return base ? `${base}/${cleanPath}` : `/${cleanPath}`;
}