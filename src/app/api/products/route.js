import { NextResponse } from 'next/server';

let products = [
  {
    id: "1",
    name: "Khmer Silk Scarf",
    description: "Handwoven silk scarf with traditional Khmer patterns",
    price: 25.99,
    imageUrl: "/placeholder.svg?height=300&width=300",
    category: "Textiles",
    userId: "admin1"
  },
  {
    id: "2",
    name: "Angkor Wat Sandstone Carving",
    description: "Miniature sandstone carving of Angkor Wat temple",
    price: 49.99,
    imageUrl: "/placeholder.svg?height=300&width=300",
    category: "Sculptures",
    userId: "admin1"
  },
  {
    id: "3",
    name: "Cambodian Silver Jewelry Box",
    description: "Intricately designed silver jewelry box with Khmer motifs",
    price: 79.99,
    imageUrl: "/placeholder.svg?height=300&width=300",
    category: "Metalwork",
    userId: "admin1"
  },
  {
    id: "4",
    name: "Bamboo Sticky Rice Container",
    description: "Traditional bamboo container for serving sticky rice",
    price: 15.99,
    imageUrl: "/placeholder.svg?height=300&width=300",
    category: "Homeware",
    userId: "admin1"
  },
  {
    id: "5",
    name: "Krama Cotton Checkered Scarf",
    description: "Traditional Cambodian scarf made from soft cotton",
    price: 12.99,
    imageUrl: "/placeholder.svg?height=300&width=300",
    category: "Textiles",
    userId: "admin1"
  }
];

export async function GET() {
  return NextResponse.json(products);
}

export async function POST(request) {
  const newProduct = await request.json();
  const productWithId = { ...newProduct, id: Date.now().toString() };
  products.push(productWithId);
  return NextResponse.json(productWithId, { status: 201 });
}

export async function PUT(request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');
  const updates = await request.json();
  
  const index = products.findIndex(p => p.id === id);
  if (index === -1) {
    return NextResponse.json({ message: 'Product not found' }, { status: 404 });
  }
  
  products[index] = { ...products[index], ...updates };
  return NextResponse.json(products[index]);
}

export async function DELETE(request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');
  
  const index = products.findIndex(p => p.id === id);
  if (index === -1) {
    return NextResponse.json({ message: 'Product not found' }, { status: 404 });
  }
  
  products.splice(index, 1);
  return NextResponse.json({ message: 'Product deleted' });
}

