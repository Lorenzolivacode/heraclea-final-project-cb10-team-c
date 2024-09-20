"use client";

import React, { useEffect, useState } from 'react';
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import ProfileForm from '@/app/[locale]/components/Molecoles/Form/ProfileForm';
import Purchases from '@/app/[locale]/components/Molecoles/Purchase/Purchases';
import maschera from "@/public/assets/maschera.webp"; 
import styles from './account.module.scss';
import { auth } from "@/app/[locale]/firebase/config"; 
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/app/[locale]/firebase/config"; 

const AccountPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'profile' | 'purchases'>('purchases');
  const [userData, setUserData] = useState<{ firstName: string; lastName: string; email: string; password?: string }>({ firstName: '', lastName: '', email: '' });
  const searchParams = useSearchParams();
  const userName = searchParams.get("userName") || "Utente";

  const [buttonColors, setButtonColors] = useState({
    profile: { background: 'var(--c-sienna)', color: 'var(--c-white)' },
    purchases: { background: 'var(--c-sienna)', color: 'var(--c-white)' }
  });

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const uid = user.uid;
        const userDataFromDB = await fetchUserData(uid);
        setUserData(userDataFromDB);
      }
    });

    return () => unsubscribe();
  }, []);

  const fetchUserData = async (uid: string) => {
    const userDoc = await getDoc(doc(db, "users", uid));
    if (userDoc.exists()) {
      return userDoc.data() as { firstName: string; lastName: string; email: string; password?: string };
    }
    return { firstName: '', lastName: '', email: '' }; 
  };

  const handleTabChange = (tab: 'profile' | 'purchases') => {
    setActiveTab(tab);
    setButtonColors(prev => ({
      profile: tab === 'profile' ? { background: 'var(--c-white)', color: 'var(--c-sienna)' } : { background: 'var(--c-sienna)', color: 'var(--c-white)' },
      purchases: tab === 'purchases' ? { background: 'var(--c-white)', color: 'var(--c-sienna)' } : { background: 'var(--c-sienna)', color: 'var(--c-white)' }
    }));
  };

  return (
    <main className="main">
      <div className={styles.profile}>
        <div className={styles.profileInfo}>
          <Image
            src={maschera}
            alt="Maschera"
            priority
            className={styles.profileImage}
          />
          <h1 className={styles.header}>
            Ciao, {userName}!
          </h1>
        </div>
      </div>
      <div className={styles.container}>
        <div className={styles.tabs}>
          <button
            className={styles.button}
            style={{ backgroundColor: buttonColors.profile.background, color: buttonColors.profile.color }}
            onClick={() => handleTabChange('profile')}
          >
            Account
          </button>
          <button
            className={styles.button}
            style={{ backgroundColor: buttonColors.purchases.background, color: buttonColors.purchases.color }}
            onClick={() => handleTabChange('purchases')}
          >
            Acquisti
          </button>
        </div>

        {activeTab === 'profile' ? <ProfileForm userData={userData} /> : <Purchases />}
      </div>
    </main>
  );
};

export default AccountPage;
