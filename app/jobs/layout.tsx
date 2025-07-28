import AsideJob from "@/components/jobs/AsideJob";
import JobDetailsModal from "@/components/jobs/JobDetailsModal";
import JobProvider from "@/context/JobContext";
import LinkedIn from "@/img/linkedin.png";

export default async function layout({ children }:{children:React.ReactNode}) {
    
  return (
     <main className="main">
            <div className="container">
                <div className="main__body">
                    <div className="jobs">
                        <div className="jobs__heading">
                            <h1 className="jobs__title">Encuentra el <span>trabajo de tu sueño</span></h1>
                            <p className="jobs__text">Lorem ipsum dolor sit amet consectetur. Faucibus ac varius tempor dis
                                bibendum. Pellentesque ut at lacus nibh vitae. Quis congue nisl vel in posuere.</p>
                            <form className="hero__form jobs__form">
                                <div className="hero__input">
                                    <input className="hero__search" type="text" placeholder="Buscar trabajo" />
                                    <div className="hero__separator"></div>
                                    <input className="hero__location" type="text" placeholder="Ubicación" />
                                </div>
                                <button className="hero__btn btn btn--primary">Buscar</button>
                            </form>
                        </div>
                        <div className="jobs__grid">
                            <AsideJob />
                             <JobProvider>
                                {children}
                               <JobDetailsModal />
                             </JobProvider>         
                        </div>

                    </div>
                </div>
            </div>
        </main>
  )
}
