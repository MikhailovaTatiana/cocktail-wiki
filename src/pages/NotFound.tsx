import Footer from '../components/Footer';
import '../styles/NotFound.css'

export function NotFound() {
  return (
    <main className='error-main'>
      <p className="code-404">Error - 404</p>
      <p className='error-msg'>This page is not found!</p>
      <Footer />
    </main>
  );
}
