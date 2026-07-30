export class logger  {
    static info(message:string){

        console.log(
            `[INFO] ${new Date().toISOString()} - ${message}`
        );

    }
}