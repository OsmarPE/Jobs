import React from 'react'
import Header from '@/components/layout/Header';
import Hero from '@/components/landing/Hero';
import Sponsors from '@/components/landing/Sponsors';
import Services from '@/components/landing/Services';
import Categories from '@/components/landing/Categories';
import About from '@/components/landing/About';
import Testimonials from '@/components/landing/Testimonials';
import Footer from '@/components/layout/Footer';
import Circle from '@/components/landing/Circle';
import HeaderLine from '@/components/landing/HeaderLine';

export default function Landing() {
  return (
    <div className="body-jobs">
    <HeaderLine />
    <Circle className="circle-left-header" />
    <Circle className="circle-middle-header" />
    <Circle className="circle-right-header" />

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
