namespace DataApi.Models
{
    public class Characteristic
    {
        public Characteristic()
        {
        }

        public Characteristic(string name, string name2, string description)
        {
            Name = name;
            Name2 = name2;
            Description = description;
        }

        public string Name { get; set; }
        
        public string Name2 { get; set; }
        
        public string Description { get; set; }
    }
}