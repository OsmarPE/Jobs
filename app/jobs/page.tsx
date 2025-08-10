import AsideJob from "@/components/jobs/AsideJob";
import JobDetailsModal from "@/components/jobs/JobDetailsModal";
import Circle from "@/components/landing/Circle";
import HeaderLine from "@/components/landing/HeaderLine";
import Header from "@/components/layout/Header";
import JobProvider from "@/context/JobContext";
import Jobs from "@/pages/jobs/Jobs";
import LoadingJobs from "@/pages/jobs/LoadingJobs";
import SearchJob from "@/pages/jobs/SearchJob";
import { Suspense } from "react";

export default async function page({ searchParams }: { searchParams: Promise<{ auth?: string, typeJob?: string, location?: string }> }) {

  const { auth, location, typeJob } = await searchParams


  return  <>
      <Header />
      <Circle className="circle-left-header" />
       <main className="main body-jobs">
              <HeaderLine />
              <div className="container">
                  <div className="main__body">
                      <div className="jobs">
                          <div className="jobs__heading">
                              <h1 className="jobs__title">Encuentra el <span>trabajo de tu sueño</span></h1>
                              <p className="jobs__text">Lorem ipsum dolor sit amet consectetur. Faucibus ac varius tempor dis
                                  bibendum. Pellentesque ut at lacus nibh vitae. Quis congue nisl vel in posuere.</p>
                             <SearchJob />
                          </div>
                          <div className="jobs__grid">
                              <AsideJob />
                               <JobProvider>
                                  <Suspense fallback={<LoadingJobs />}>
                                      <Jobs auth={auth} location={location? +location : undefined} typeJob={typeJob ? +typeJob : undefined} />
                                  </Suspense>
                                 <JobDetailsModal />
                               </JobProvider>         
                          </div>
  
                      </div>
                  </div>
              </div>
          </main>
      </> 
  
  
}
