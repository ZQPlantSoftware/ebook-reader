import xFetch from '../utils/xFetch';

export async function getAll() {
  return xFetch('/api/todos');
}
