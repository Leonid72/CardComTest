using AutoMapper;
using TestApi.Interfaces;
using TestApi.Models.Dtos;

namespace TestApi.Repositories
{
    public class TransactionRepository : ITransactionRepository
    {
        private readonly IMapper _mapper;
        public TransactionRepository(IMapper mapper)
        {
            _mapper = mapper;
        }


        public async Task<TransactionResponseDto> GetAllNetAmountAsync(Models.Transaction tr)
        {
            return  _mapper.Map<TransactionResponseDto>(tr);
        }
    }
}
