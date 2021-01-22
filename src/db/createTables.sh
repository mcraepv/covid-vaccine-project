npx sequelize-cli model:generate --name User --attributes id:string,firstName:string,lastName:string,phoneNumber:string,guaranteeId:string,waitlistId:string
npx sequelize-cli model:generate --name Slot --attributes id:string,day:date,slotNumber:integer,locationId:string,isReserved:boolean
npx sequelize-cli model:generate --name Location --attributes id:string,name:string,address:string,numberOfSlots:numberOfSlots
npx sequelize-cli model:generate --name Waitlists --attributes id:string,userId:string,day:date
npx sequelize-cli model:generate --name Guarantees --attributes id:string,userId:string,day:date