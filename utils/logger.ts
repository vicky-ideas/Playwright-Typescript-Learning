export class logger  {
    static info(message:string){

        console.log(
            `[INFO] ${new Date().toISOString()} - ${message}`
        );

    }

    static error(message:string){
        console.error(
            `[ERROR] ${new Date().toISOString()} - ${message}`
        );

    }
}