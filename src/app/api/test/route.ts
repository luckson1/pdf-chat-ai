import { PuppeteerWebBaseLoader } from "langchain/document_loaders/web/puppeteer";
import { NextResponse } from "next/server";

const handler = (req: Request) => {
    console.log("working....")
    const loader = new PuppeteerWebBaseLoader('')
    return NextResponse.json({greetings: "hi"})
}
  

export { handler as GET, handler as POST };