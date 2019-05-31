export class Products {
	constructor(
		public id: number, 
		public name: string, 
		public price: number, 
		public owner: object,
		public store: number,
		public type: number,
		public description: string, 
		public category: string, 
		public location: string,
		public status: number,
		public image: string, 
		public created_at: string,
		public updated_at: string, 
		) {}
  }