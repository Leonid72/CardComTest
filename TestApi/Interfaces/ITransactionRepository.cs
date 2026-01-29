using System.Transactions;
using TestApi.Models;
using TestApi.Models.Dtos;
using Transaction = TestApi.Models.Transaction;

namespace TestApi.Interfaces
{
    public interface ITransactionRepository
    {
        Task<TransactionResponseDto> GetAllNetAmountAsync(Transaction tr);
    }
}
