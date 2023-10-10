using MongoDB.Driver;

namespace Infra;

public class Utilities
{
    
    
    private static readonly Uri Uri = new Uri("postgres://vqnwkpah:6bXQcpuo3PWNs4pEbx5pLadp45ZkA6n8@cornelius.db.elephantsql.com/vqnwkpah");

    public static readonly string
        ProperlyFormattedConnectionString = string.Format(
            "Server={0};Database={1};User Id={2};Password={3};Port={4};Pooling=true;MaxPoolSize=3",
            Uri.Host,
            Uri.AbsolutePath.Trim('/'),
            Uri.UserInfo.Split(':')[0],
            Uri.UserInfo.Split(':')[1],
            Uri.Port > 0 ? Uri.Port : 5432);
}