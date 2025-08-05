import { Button } from '@/components/ui/button'
import { dummyInterviews } from '@/constants'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import InterviewCard from '@/components/InterviewCard'

const Page = () => {
  return (
    <>
    <section className="card-cta">
      <div className="flex flex-col gap-6 max-w-lg">
         <h2>Get interview ready with ai powerd practice and feedback</h2>
          <p className='text-lg'>
            practice on real interviews questions and get instant feedback 
            </p>    

            <Button asChild className="btn-primary max-sm:w-full">
              <Link href="/interview">
              start an interview
              </Link>

            </Button>
        </div>

        <Image src="/robot.png" width={400} height={400} className="max-sm:hidden" alt="robot"/>

    </section>

    <section className="flex flex-col gap-6 mt-8"> <h2>your interview</h2>
    <div className="interview-section">
      {dummyInterviews.map((interview)=> (
        <InterviewCard {...interview} key={interview.id}/>
      ))}
    </div>
    </section>
    <section className="flex flex-col gap-6 mt-8">
      <h2>take an interview</h2>

      <div className="interviews-section">{dummyInterviews.map((interview)=> (
        <InterviewCard {...interview} key={interview.id}/>
      ))}
      </div>
    </section>
    </>
  )
}

export default Page