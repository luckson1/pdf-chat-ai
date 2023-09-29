import Link from 'next/link'
import React from 'react'

export default function Footer() {
  return (
    <footer className=" mt-0   py-6 text-center  relative flex flex-col items-start w-full  px-4  min-h-[40vh]">
            <div className="container mx-auto ">
              <div className="flex w-full flex-col py-6 md:flex-row">
               
                <div className="flex-1">
                  <p className="uppercase    md:mb-6 ">Links</p>
                  <ul className=" mb-6">
                    <li className="mr-2 mt-2 inline-block md:mr-0 md:block">
                      <Link
                        href="/#faqs"
                        className=" no-underline   hover:underline"
                      >
                        FAQ
                      </Link>
                    </li>
                  
                    <li className="mr-2 mt-2 inline-block md:mr-0 md:block">
                      <a
                       href="mailto:support@piccraftai.com"
                           target="_blank"
            rel="noreferrer nofollow"
                        className=" no-underline   hover:underline"
                      >
                        Support
                      </a>
                    </li>
                  </ul>
                </div>
                <div className="flex-1">
                  <p className="uppercase    md:mb-6">Legal</p>
                  <ul className="list-reset mb-6">
                    <li className="mr-2 mt-2 inline-block md:mr-0 md:block">
                      <Link
                        href="/terms"
                        className=" no-underline   hover:underline"
                      >
                        Terms
                      </Link>
                    </li>
                    <li className="mr-2 mt-2 inline-block md:mr-0 md:block">
                      <Link
                        href="/privacy"
                        className=" no-underline   hover:underline"
                      >
                        Privacy
                      </Link>
                    </li>
                  </ul>
                </div>
                <div className="flex-1">
                  <p className="uppercase    md:mb-6">Social</p>
                  <ul className="list-reset mb-6">
                    <li className="mr-2 mt-2 inline-block md:mr-0 md:block">
                      <Link
                        href="/"
                        className=" no-underline   hover:underline"
                      >
                        Tik Tok
                      </Link>
                    </li>
                    <li className="mr-2 mt-2 inline-block md:mr-0 md:block">
                     
                    </li>
                    <li className="mr-2 mt-2 inline-block md:mr-0 md:block">
                      <Link
                        href="/"
                        className=" no-underline   hover:underline"
                      >
                           Instagram
                      
                      </Link>
                    </li>
                  </ul>
                </div>
                <div className="flex-1">
                  <p className="uppercase    md:mb-6">Company</p>
                  <ul className="list-reset mb-6">
                    <li className="mr-2 mt-2 inline-block md:mr-0 md:block">
                      <Link
                        href="/"
                        className=" no-underline   hover:underline"
                      >
                        Official Blog
                      </Link>
                    </li>
                    <li className="mr-2 mt-2 inline-block md:mr-0 md:block">
                    </li>
                    <li className="mr-2 mt-2 inline-block md:mr-0 md:block">
                      <Link
                         href="mailto:support@piccraftai.com"
                             target="_blank"
            rel="noreferrer nofollow"
                        className=" no-underline   hover:underline"
                      >
                        Contact
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </footer>
  )
}
