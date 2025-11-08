import Header from '@/components/ui/header'
import Footer from '@/components/ui/Footer'
import DrunkBar from '@/components/ui/DrunkBar'
export default function Home() {
  return (
    <>
    <Header/>
    <DrunkBar />
    <div className="flex min-h-screen items-center justify-center">
      <main className="flex flex-col items-center gap-4">

      </main>
    </div>
    <Footer/>
    </>
  );
}