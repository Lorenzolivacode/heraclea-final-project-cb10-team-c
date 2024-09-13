// import { notFound } from 'next/navigation';
// import styles from '@/app/Home.module.scss';
// import style from '@/app/escursioni/Escursioni.module.scss';

// const getEscursioneById = async (id: string) => {

//   const data = {
//     title: 'In bici tra storia e natura',
//     image: '/path/to/image1.jpg', 
//   return data;
// };

// export default async function EscursioneDetail({ params }: { params: { id: string } }) {
//   const { id } = params;

//   const escursione = await getEscursioneById(id);
  
//   if (!escursione) {
//     return notFound();
//   }

//   return (
//     <main className={styles.main}>
//       <h1 className={style.title}>{escursione.title}</h1>
//       <div className={styles.imageContainer}>
//         <img src={escursione.image} alt={`Escursione ${id}`} />
//       </div>
//       <div className={styles.bookingSection}>
//         <h2>Prenota</h2>
//         <p>Puoi prenotare chiamando il numero{' '}
//           <a href="tel:+393339987565" className={styles.phoneLink}>
//             +39 333 9987565
//           </a>
//         </p>
//       </div>
//     </main>
//   );
// }
