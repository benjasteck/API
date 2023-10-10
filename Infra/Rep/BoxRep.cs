
using Dapper;
using Infra.InfModels;
using Npgsql;

namespace Infra.Rep;

public class BoxRep
{
    private readonly NpgsqlDataSource _dataSource;
    
    public BoxRep(NpgsqlDataSource datasource)
    {
        _dataSource = datasource;
    }
    public IEnumerable<Box> getBoxFeed()
    {
        string sql = $@"
SELECT id as {nameof(Box.id)},
       typeid as {nameof(Box.typeid)},
        material as {nameof(Box.material)},
        price as {nameof(Box.price)}
FROM public.box;
";
        using (var conn = _dataSource.OpenConnection())
        {
            return conn.Query<Box>(sql);
        }
    }

    public void DeleteBox(int id)
    {
        var sql = @"DELETE FROM public.box WHERE id = @id;";
        
        using (var conn = _dataSource.OpenConnection())
        {
            conn.Execute(sql, new {id});
        }
    }
    
    public Box CreateBox(long typeid,string material, long price)
    {
        var sql = $@"
INSERT INTO public.box (type, weight, price) 
VALUES (@typeid, @material, @price, )
RETURNING id as {nameof(Box.id)},
       typeid as {nameof(Box.typeid)},
        material as {nameof(Box.material)}
        price as {nameof(Box.price)}

        
";
        using (var conn = _dataSource.OpenConnection())
        {
            return conn.QueryFirst<Box>(sql, new { typeid, material, price});
        }
    }

    public Box getFullBox(int id)
    {
        var sql = $@"SELECT id as {nameof(Box.id)},
            typeid as {nameof(Box.typeid)},
        material as {nameof(Box.material)},
        price as {nameof(Box.price)}
       FROM public.box WHERE id = @id;";
        using (var conn = _dataSource.OpenConnection())
        {
            return conn.QueryFirst<Box>(sql, new { id });
        }
    }
    public Box UpdateBox(int id, long typeid, string material, long price )
    {
        var sql = $@"
UPDATE public.box SET typeid = @typeid, material = @material, price = @price 
WHERE id = @id
RETURNING id as {nameof(Box.id)},
       typeid as {nameof(Box.typeid)},
        material as {nameof(Box.material)},
        price as {nameof(Box.price)};
    
";

        using (var conn = _dataSource.OpenConnection())
        {
            return conn.QueryFirst<Box>(sql, new { id,typeid, price, material});
        }
    }
    public IEnumerable<Box> searchBox(Search parameters)
    {
        var sql = $@"
        SELECT 
            id as {nameof(Box.id)},
            typeid as {nameof(Box.typeid)},
            material as {nameof(Box.material)}
         price as {nameof(Box.price)}
        FROM public.box
        WHERE (LOWER(typeid) LIKE LOWER(@SearchTerm) OR LOWER(material) LIKE LOWER(@SearchTerm) OR LOWER(price) LIKE LOWER(@SearchTerm))";

        using (var conn = _dataSource.OpenConnection())
        {
            return conn.Query<Box>(sql, new
            {
                SearchTerm = "%" + parameters.SearchTerm + "%"
            });
        }
    }
}
