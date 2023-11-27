import {Seo} from "@/ui/components/seo"
import { Button } from "@/ui/design-system/typography/button/button";
import { Typography } from "@/ui/design-system/typography/typography";
import { RiEmotionLine } from "react-icons/ri";

export default function Home() {
  return (
   
   <>
       <Seo title= "App-Bast" description="description.."/>

       <div className="flex items-center gap-4 p-10">
       <Button size="small" icon ={{icon :RiEmotionLine}} iconPosition ="left">
       Accent</Button>
       <Button size="small" icon ={{icon :RiEmotionLine}}>
       Accent</Button>
       <Button size="small">Accent</Button>
       <Button size="small" variant="secondary">Accent</Button>
       <Button size="small" variant="outline">Accent</Button>
       <Button size="small" variant="ico" icon ={{icon :RiEmotionLine}} />
       </div>
       
       <div className="flex items-center gap-4 p-10">
       <Button>Accent</Button>
       <Button variant="secondary">Accent</Button>
       <Button variant="outline">Accent</Button>
       <Button variant="disabled"disabled >Accent</Button>
       <Button size="medium" variant="ico" icon ={{icon :RiEmotionLine}} />
       </div>
       
       <div className="flex items-center gap-4 p-10">
       <Button size="large">Accent</Button>
       <Button size="large" variant="secondary">Accent</Button>
       <Button size="large" variant="outline">Accent</Button>
       <Button size="large" variant="disabled"disabled >Accent</Button>
       <Button size="large" variant="ico" icon ={{icon :RiEmotionLine}} />
       </div>

       {/* <div className="space-y-5">
        <Typography theme="primary" variant="h1" component="div">Hello World</Typography>
        <Typography theme="gray" variant="lead" component="div">Hello World</Typography>
        <Typography theme="secondary" variant="body-sm" component="div">Hello World</Typography>
        <Typography variant="caption4" component="div">Hello World</Typography>
        <Typography variant="caption4" component="div">Hello World</Typography>


        </div> */}
   </>
    
  );
}