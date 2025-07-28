import React from 'react'
import Header from '@/components/layout/Header';
import Hero from '@/components/landing/Hero';
import Sponsors from '@/components/landing/Sponsors';
import Services from '@/components/landing/Services';
import Categories from '@/components/landing/Categories';
import About from '@/components/landing/About';
import Testimonials from '@/components/landing/Testimonials';
import Footer from '@/components/layout/Footer';

export default function Landing() {
  return (
    <div className="body-jobs">
          <div className="header-line"></div>
    <div className="circle circle-left-header"></div>
    <div className="circle circle-middle-header"></div>
    <div className="circle circle-right-header"></div>
    <Header />
    <main className="main">
        <Hero />
        <Sponsors />
        <Services />
        <Categories />
        <About />
        <Testimonials />
    </main>
    <Footer />
    </div>

  )
}
