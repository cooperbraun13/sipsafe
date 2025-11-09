'use client';
import Header from '@/components/ui/header'
import Footer from '@/components/ui/Footer'
import DrunkBar from '@/components/ui/DrunkBar'
import LogDrinkButton from '@/components/ui/LogDrinkButton'
import DrinkLog from '@/components/ui/DrinkLog'

export default function Home() {
  return (
    <>
    <Header/>
    <DrunkBar />
    <DrinkLog />
    {/* <LogDrinkButton onClick={() => console.log("clicked")}> Log Drinks</Button> */}
    <div className="flex min-h-screen items-center justify-center">
      <main className="flex flex-col items-center gap-4">
      
      </main>
    </div>
    <Footer/>
    </>
  );
}