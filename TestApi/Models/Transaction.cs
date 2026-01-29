using System.ComponentModel.DataAnnotations;

namespace TestApi.Models
{
    public class Transaction
    {
        public Guid Id { get; set; }
        [Required,MinLength(3)]
        public string CuastomerName { get; set; }

        [Range(0.01,double.MaxValue, ErrorMessage = "Value must be greater than 0")]
        public decimal Amount { get; set; }
    }
}
