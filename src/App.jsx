import { useEffect, useState } from 'react';

export const App=()=> {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/posts?_limit=8')
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP-hiba: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        setPosts(data);
        setLoading(false);
      })
      .catch(err => {
        setError(`Nem sikerült betölteni az adatokat: ${err.message}`);
        setLoading(false);
      });
  }, []);

  return (
    <main className="page">
      <header>
        <p className="eyebrow">REACT + VITE + BUN</p>
        <h1>useEffect: külső API-ból a state-be</h1>
        <p className="intro">
          A komponens betölt egy külső API-t, majd a kapott adatokat React state-ben tárolja.
        </p>
      </header>

      <section className="panel">
        <h2>Bejegyzések</h2>
        {loading && <p className="status">Adatok betöltése…</p>}
        {error && <p className="error">{error}</p>}
        {!loading && !error && (
          <ul className="posts">
            {posts.map(post => (
              <li key={post.id}>
                <strong>{post.id}. {post.title}</strong>
                <p>{post.body}</p>
              </li>
            ))}
          </ul>
        )}
      </section>

      <section className="panel">
        <h2>A lényegi kódrészlet</h2>
        <pre>{`const [posts, setPosts] = useState([]);

useEffect(() => {
  fetch('https://jsonplaceholder.typicode.com/posts?_limit=8')
    .then(response => response.json())
    .then(data => setPosts(data));
}, []);`}</pre>
        <p>
          A <code>fetch()</code> lekéri az adatokat. A <code>setPosts(data)</code> eltárolja
          őket a state-ben, ezért a React újrarendereli a komponenst, és megjeleníti a listát.
        </p>
      </section>

      <section className="panel note">
        <h2>Miért üres a függőségi tömb?</h2>
        <p>
          A <code>[]</code> azt jelzi, hogy az effect nem függ a komponens változó értékeitől.
          A React a komponens megjelenésekor futtatja le. Fejlesztői módban a
          <code> StrictMode</code> ellenőrzésként megismételheti az effect életciklusát.
        </p>
      </section>
      <footer>Tanórai demó • Internetkapcsolat szükséges.</footer>
    </main>
  );
}