export interface NeuralNetwork {
  id: string;
  name: string;
  description: string;
  url: string;
  imgUrl?: string;
}

export interface Category {
  id: string;
  name: string;
  description: string;
  color: string;
  icon?: string;
  networks: NeuralNetwork[];
} 