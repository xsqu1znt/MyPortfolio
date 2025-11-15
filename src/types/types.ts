export interface ServiceCardProps {
    index: number;
    title: string;
    description: string[];
    subtext: string;
    price: {
        starting?: string;
        monthly?: string;
        perPage?: string;
    };

    extraDetails: string[];
    handleContact?: () => void;
}
