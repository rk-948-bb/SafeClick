namespace DTO
{
    public class ProductDTO
    {
        public int Id { get; set; }
        public string IpAddress { get; set; }
        public string Model { get; set; }
        public int NumBranch { get; set; }
        public int NumComputer { get; set; }

        public int CategoryId { get; set; }
        public CategoryDTO? Category { get; set; }
    }
}